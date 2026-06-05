const authorizeRole = (...roles) => (req, res, next)    => {
    if (!roles.includes(req.user.role)) {
        const error = new Error('Not authorised to perform this action')
        error.statusCode = 403
        next(error)
    }
}

export default authorizeRole