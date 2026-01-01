const getisuser = async (req, res, next) => {
    const { email } = req;
    const user = await User.findOne({ email }).select('-password');

    if (!user) {
        return res.status(401).json({ message: "User is not found." });
    }

    // Compare password

    res.json({
        success: true,
        statusCode: 200,
        message: "Retrived User",
        data: user,
    });
}


export { getisuser };
