import asyncHandler from 'express-async-handler';

// @des    Register a new user
// @route  POST api/auth/register
// @access public
export const register = asyncHandler(async(req, res) => {});

// @des    Login user
// @route  POST api/auth/login
// @access public
export const login = asyncHandler(async(req, res) => {});

// @des    Logout user
// @route  POST api/auth/logout
// @access public
export const logout = asyncHandler(async(req, res) => {});