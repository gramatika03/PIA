import express from 'express'
import OwnerM from '../models/owner'
import RequestM from '../models/request'
import JobM from '../models/job'
import DecoraterM from '../models/decorater'

export class OwnerController {

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
        OwnerM.findOne({ username: req.body.username, password: req.body.password }).then(
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
        OwnerM.find().then(
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

    saveChanges = (req: express.Request, res: express.Response) => {
        req.body.password = this.cypherPassword(req.body.password)
        OwnerM.updateOne({ username: req.body.username }, req.body).then(
            data => {
                res.json(true)
            }
        )
    }

    deactivate = (req: express.Request, res: express.Response) => {
        OwnerM.updateOne({ username: req.body.username }, { activated: !req.body.activated }).then(
            data => {
                res.json(true)
            }
        )
    }

    getAllRequests = (req: express.Request, res: express.Response) => {
        RequestM.find().then(
            data => {
                res.json(data)
            }
        )
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        req.body.activated = true;
        RequestM.deleteOne({ username: req.body.username }).then(
            data => {
                new OwnerM(req.body).save().then(
                    data => {
                        res.json(true);
                    }
                )
            }
        )
    }

    denyRequest = (req: express.Request, res: express.Response) => {
        req.body.activated = false;
        RequestM.deleteOne({ username: req.body.username }).then(
            data => {
                new OwnerM(req.body).save().then(
                    data => {
                        res.json(true);
                    }
                )
            }
        )
    }

    register = (req: express.Request, res: express.Response) => {
        let userNew = {
            username: req.body.username,
            password: this.cypherPassword(req.body.password),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            picture: req.body.picture,
            creditCardNumber: req.body.creditCardNumber,
            type: req.body.type,
            activated: false
        }

        let success = false;
        DecoraterM.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then(
            data => {
                if (data) {
                    res.json(success)
                } else {
                    OwnerM.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then(
                        user => {
                            if (user) {
                                res.json(success)
                            } else {
                                RequestM.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then(
                                    user => {
                                        if (user) {
                                            res.json(success);
                                        } else {
                                            new RequestM(userNew).save().then(
                                                ok => {
                                                    success = true;
                                                    res.json({ success });
                                                }
                                            ).catch(
                                                err => {
                                                    console.log(err);
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

    changePassword = (req: express.Request, res: express.Response) => {
        req.body.passwordNew = this.cypherPassword(req.body.passwordNew)
        req.body.passwordOld = this.cypherPassword(req.body.passwordOld)
        OwnerM.findOne({ username: req.body.username, password: req.body.passwordOld }).then(
            data => {
                if (data) {
                    OwnerM.updateOne({ username: req.body.username, password: req.body.passwordOld }, { password: req.body.passwordNew }).then(
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