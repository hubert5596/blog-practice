// 检查用户是否登录

module.exports = {
    checkLogin: function (req, res, next) {
        if (!req.session.user) {
            console.log('User not logged in')
            return req.redirect('/signin')
        }
        next()
    },

    checkNotLogin: function (req, res, next) {
        if (req.session.user) {
            console.log('User is logged in')
            return req.redirect('/signin')
        }
        next()
    }
}