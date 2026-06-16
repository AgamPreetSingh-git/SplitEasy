const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Check connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Hash Password
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// Compare Password
const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ============================================
// API ROUTES
// ============================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date(),
    database: 'Connected'
  });
});

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Register Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Validation
    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Email, name, and password required' });
    }

    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, name, hashedPassword]
    );

    const user = result.rows[0];
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Check if user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare passwords
    const isValidPassword = await comparePassword(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get Current User
app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, name FROM users WHERE id = $1', [req.userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ============================================
// GROUP ROUTES (Basic)
// ============================================

// Create Group
app.post('/api/groups', verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Group name required' });
    }

    // Create group
    const result = await pool.query(
      'INSERT INTO groups (name, description, created_by) VALUES ($1, $2, $3) RETURNING *',
      [name, description || '', req.userId]
    );

    const group = result.rows[0];

    // Add creator as member
    await pool.query(
      'INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)',
      [group.id, req.userId]
    );

    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      group,
    });
  } catch (err) {
    console.error('Group creation error:', err);
    res.status(500).json({ error: 'Failed to create group' });
  }
});

// Get All Groups for User
app.get('/api/groups', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT g.* FROM groups g 
       JOIN group_members gm ON g.id = gm.group_id 
       WHERE gm.user_id = $1`,
      [req.userId]
    );

    res.json({
      success: true,
      groups: result.rows,
    });
  } catch (err) {
    console.error('Error fetching groups:', err);
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

// Get Group by ID
app.get('/api/groups/:id', verifyToken, async (req, res) => {
  try {
    const groupId = req.params.id;

    // Check if user is member
    const memberCheck = await pool.query(
      'SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2',
      [groupId, req.userId]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Not a member of this group' });
    }

    // Get group details
    const result = await pool.query('SELECT * FROM groups WHERE id = $1', [groupId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json({
      success: true,
      group: result.rows[0],
    });
  } catch (err) {
    console.error('Error fetching group:', err);
    res.status(500).json({ error: 'Failed to fetch group' });
  }
});

// ============================================
// EXPENSE ROUTES (Basic)
// ============================================

// Add Expense
app.post('/api/groups/:id/expenses', verifyToken, async (req, res) => {
  try {
    const groupId = req.params.id;
    const { amount, description, category, split_between } = req.body;

    // Validation
    if (!amount || !description) {
      return res.status(400).json({ error: 'Amount and description required' });
    }

    // Check if user is member
    const memberCheck = await pool.query(
      'SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2',
      [groupId, req.userId]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Not a member of this group' });
    }

    // Create expense
    const expenseResult = await pool.query(
      'INSERT INTO expenses (group_id, paid_by, amount, description, category, expense_date) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [groupId, req.userId, amount, description, category || null]
    );

    const expense = expenseResult.rows[0];

    // Split expense among users
    if (split_between && split_between.length > 0) {
      const splitAmount = amount / split_between.length;

      for (const userId of split_between) {
        await pool.query(
          'INSERT INTO expense_splits (expense_id, user_id, amount_owed) VALUES ($1, $2, $3)',
          [expense.id, userId, splitAmount]
        );
      }
    }

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      expense,
    });
  } catch (err) {
    console.error('Expense creation error:', err);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// Get Expenses for Group
app.get('/api/groups/:id/expenses', verifyToken, async (req, res) => {
  try {
    const groupId = req.params.id;

    // Check if user is member
    const memberCheck = await pool.query(
      'SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2',
      [groupId, req.userId]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Not a member of this group' });
    }

    // Get expenses
    const result = await pool.query(
      'SELECT * FROM expenses WHERE group_id = $1 ORDER BY created_at DESC',
      [groupId]
    );

    res.json({
      success: true,
      expenses: result.rows,
    });
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Get Settlement Summary (Who owes whom)
app.get('/api/groups/:id/settlements', verifyToken, async (req, res) => {
  try {
    const groupId = req.params.id;

    // Check if user is member
    const memberCheck = await pool.query(
      'SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2',
      [groupId, req.userId]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Not a member of this group' });
    }

    // Get all expenses and splits for the group
    const result = await pool.query(
      `SELECT 
        es.user_id,
        u.name,
        SUM(es.amount_owed) as total_owed,
        COUNT(*) as expense_count
       FROM expense_splits es
       JOIN expenses e ON es.expense_id = e.id
       JOIN users u ON es.user_id = u.id
       WHERE e.group_id = $1 AND es.settled = FALSE
       GROUP BY es.user_id, u.name
       ORDER BY total_owed DESC`,
      [groupId]
    );

    res.json({
      success: true,
      settlements: result.rows,
    });
  } catch (err) {
    console.error('Error fetching settlements:', err);
    res.status(500).json({ error: 'Failed to fetch settlements' });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: Connected to PostgreSQL`);
  console.log(`\n✅ API is ready for requests`);
});

module.exports = app;
