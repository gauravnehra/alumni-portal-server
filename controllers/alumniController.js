// dependencies

exports.register = async (req, res) => {
    if (!req.body.name || !req.body.batch || !req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Bad Request" });
    }


    // // check if account exists
    // let company = await Company.findOne({ email: req.body.email })
    // if (company) {
    //     // 409 : Conflict
    //     return res.status(409).send({ msg: "User already exists with same email id." })
    // }

    // // create new user(company), hash the password
    // company = new Company({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password, salt),
    //     location: req.body.location,
    //     domain: req.body.domain
    // })

    // // saving user in DB
    // company.save(async (err) => {
    //     if (err) res.status(500).send({ msg: "Some error occured", err: err })
    //     else {
    //         let token = new Token({ userId: company._id })
    //         await token.save()
    //         sendVerifyMail(company._id, company.email)
    //         res.status(200).header("authorization", token._id).send({ msg: "Account created successfully." })
    //     }
    // })

    res.send('respond with a resource');

};

exports.login = async (req, res) => {
    // // check if account exists
    // let company = await Company.findOne({ email: req.body.email })
    // if (company) {
    //     // 409 : Conflict
    //     return res.status(409).send({ msg: "User already exists with same email id." })
    // }

    // // create new user(company), hash the password
    // company = new Company({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password, salt),
    //     location: req.body.location,
    //     domain: req.body.domain
    // })

    // // saving user in DB
    // company.save(async (err) => {
    //     if (err) res.status(500).send({ msg: "Some error occured", err: err })
    //     else {
    //         let token = new Token({ userId: company._id })
    //         await token.save()
    //         sendVerifyMail(company._id, company.email)
    //         res.status(200).header("authorization", token._id).send({ msg: "Account created successfully." })
    //     }
    // })

    res.send('respond with a resource');

};