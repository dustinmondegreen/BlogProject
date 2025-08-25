const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesTotal = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    return likesTotal
}

const favoriteBlog = (blogs) => {
    const blogMostLiked = blogs.reduce((mostLiked, currentObject) => {
        return currentObject.likes > mostLiked.likes? currentObject : mostLiked;
    }, blogs[0])
    return blogMostLiked
}
module.exports = { dummy, totalLikes, favoriteBlog }