import express from 'express'
import DecoraterM from '../models/decorater'
import OwnerM from '../models/owner'
import AdminM from '../models/admin'
import RequestM from '../models/request'
import JobM from '../models/job'

export class DecoraterController {

    cypherPassword(password: string) {
        let cypheredPassword = ""
        for (let i = 0; i < password.length; i++) {
            let charCode = password.charCodeAt(i)
            cypheredPassword = cypheredPassword + String.fromCharCode(charCode + 1);
        }
        return cypheredPassword
    }

    decryptPassword(password: string) {
        let cypheredPassword = ""
        for (let i = 0; i < password.length; i++) {
            let charCode = password.charCodeAt(i)
            cypheredPassword = cypheredPassword + String.fromCharCode(charCode - 1);
        }
        return cypheredPassword
    }

    login = (req: express.Request, res: express.Response) => {
        req.body.password = this.cypherPassword(req.body.password)
        DecoraterM.findOne({ username: req.body.username, password: req.body.password }).then(
            (user) => {
                if (user) {
                    const password = user.password;
                    if (typeof password === 'string') {
                        user.password = this.decryptPassword(password);
                    }
                    res.json(user)
                } else {
                    res.json(null);
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    getAll = (req: express.Request, res: express.Response) => {
        DecoraterM.find().then(
            data => {
                for (let i = 0; i < data.length; i++) {
                    const password = data[i].password;
                    if (typeof password === 'string') {
                        data[i].password = this.decryptPassword(password);
                    }
                }
                res.json(data)
            }
        )
    }

    getAllJobsData = (req: express.Request, res: express.Response) => {
        JobM.find().then(
            data => {
                res.json(data)
            }
        )
    }

    saveChanges = async (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        req.body.password = this.cypherPassword(req.body.password)
        const queries = [
            OwnerM.exists({ email }),
            DecoraterM.exists({ email }),
            AdminM.exists({ email }),
            RequestM.exists({ email })
        ];

        const results = await Promise.all(queries);

        const exists = results.some(result => result !== null);

        if (exists) {
            const decorator = await DecoraterM.findOne({ email: req.body.email });
            if (decorator?.username && req.body.username == decorator.username) {
                DecoraterM.updateOne({ username: req.body.username }, req.body).then(
                    data => {
                        res.json(true)
                    }
                )
            } else {
                res.json(false);
            }
        } else {
            DecoraterM.updateOne({ username: req.body.username }, req.body).then(
                data => {
                    res.json(true)
                }
            )
        }
    }

    deactivate = (req: express.Request, res: express.Response) => {
        DecoraterM.updateOne({ username: req.body.username }, { activated: !req.body.activated }).then(
            data => {
                res.json(true)
            }
        )
    }

    blockAppointment = (req: express.Request, res: express.Response) => {
        DecoraterM.updateOne({ username: req.body.username }, { blocked: true }).then(
            data => {
                res.json(true)
            }
        )
    }

    allowAppointment = (req: express.Request, res: express.Response) => {
        DecoraterM.updateOne({ username: req.body.username }, { blocked: false }).then(
            data => {
                res.json(true)
            }
        )
    }

    addNew = (req: express.Request, res: express.Response) => {
        req.body.password = this.cypherPassword(req.body.password)
        OwnerM.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).then(
            data => {
                if (data) {
                    res.json(false)
                } else {
                    DecoraterM.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).then(
                        data => {
                            if (data) {
                                res.json(false)
                            } else {
                                AdminM.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).then(
                                    data => {
                                        if (data) {
                                            res.json(false)
                                        } else {
                                            RequestM.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).then(
                                                data => {
                                                    if (data) res.json(false)
                                                    else {
                                                        new DecoraterM(req.body).save().then(
                                                            data => {
                                                                if (data) res.json(true);
                                                                else res.json(false);
                                                            }
                                                        )
                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        )

    }

    addJob = (req: express.Request, res: express.Response) => {
        JobM.find({ username: req.body.username }).then(
            data => {
                if (data.length >= 1) {
                    res.json(false)
                } else {
                    new JobM(req.body).save().then(
                        data => {
                            DecoraterM.updateOne({ username: req.body.username }, { firm: req.body.firmName }).then(
                                data => res.json(true)
                            )
                        }
                    )

                }
            }
        )
    }

    changePassword = (req: express.Request, res: express.Response) => {
        req.body.passwordOld = this.cypherPassword(req.body.passwordOld)
        req.body.passwordNew = this.cypherPassword(req.body.passwordNew)
        DecoraterM.findOne({ username: req.body.username, password: req.body.passwordOld }).then(
            data => {
                if (data) {
                    DecoraterM.updateOne({ username: req.body.username, password: req.body.passwordOld }, { password: req.body.passwordNew }).then(
                        data => {
                            res.json(true)
                        }
                    )
                } else {
                    res.json(false);
                }
            }
        )
    }

}