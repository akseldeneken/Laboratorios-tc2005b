exports.homepage = async (req, res) => {
    const locals = {
        title: 'NodeJs Notes',
        description: 'Free NodeJs Notes App'
    }

    res.render('index', locals);
};
