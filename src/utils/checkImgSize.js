const checkImgSize = (img) => {
    if (img > 300000) {
        return false
    }
    return true
}

export default checkImgSize