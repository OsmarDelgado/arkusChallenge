import bcrypt from 'bcryptjs'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { user } = new PrismaClient

export async function getUsers( req, res ) {
    try {
        const users = await user.findMany( {
            select : {
                id : true,
                email : true,
                firstName : true,
                lastName : true,
                roleId : true,
                profile : true
            }
        } )
    
        return res.status( 200 ).json( {
            message : 'Users',
            data : users
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function getUsersById( req, res ) {
    const { userId } = req.params

    try {
        const userFound = await user.findUnique( {
            where : {
                id : parseInt( userId )
            },

            select : {
                id : true,
                email : true,
                firstName : true,
                lastName : true,
                roleId : true,
                profile : true
            }
        } )

        if( !userFound ) {
            return res.status( 404 ).json( {
                message : "User does not exist!",
                data : {}
            } )
        }
    
        return res.status( 200 ).json( {
            message : "User",
            data : userFound
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function createUser( req, res ) {
    const { username, email, firstName, lastName, password, roleId } = req.body
    
    try {
        const userExist = await user.findUnique( {
            where: {
                username
            },

            select: {
                username: true
            }
        } )

        if( userExist ) {
            return res.status(400).json( {
                message : "User already exist!"
            } )
        }

        if( roleId ) {
            const userUser = await user.create( {
                data: {
                    username,
                    email,
                    firstName,
                    lastName,
                    password : await bcrypt.hash( password, 10 ),
                    roleId,
                    profile : {
                        create : {
                            bio : 'here comes somenthing great of you',
                            englishLevel : 'Your English level',
                            technicalKnowledge : 'Your technical knowledge',
                            urlCV : 'Your ArkusNexus CV Link'
                        }
                    }
                }
            } )
    
            return res.status( 201 ).json( {
                message: "User created successfully!",
                data: userUser
            } )
        }

        const userUser = await user.create( {
            data: {
                username,
                email,
                firstName,
                lastName,
                password : await bcrypt.hash( password, 10 ),
                profile : {
                    create : {
                        bio : 'here comes somenthing great of you',
                        englishLevel : 'Your English level',
                        technicalKnowledge : 'Your technical knowledge',
                        urlCV : 'Your ArkusNexus CV Link'
                    }
                }
            }
        } )

        return res.status( 201 ).json( {
            message: "User created successfully!",
            data: userUser
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function updateUser( req, res ) {
    const { userId } = req.params
    const { username, email, firstName, lastName, password, roleId } = req.body

    try {
        const userVerifyExist = await user.findUnique( {
            where : {
                id : parseInt( userId )
            }
        } )

        if( !userVerifyExist ) {
            return res.status( 404 ).json( {
                message : "User does not exist!",
            } )
        }

        const userUpdate = await user.update( {
            where : {
                id : parseInt( userId )
            },

            data : {
                email,
                firstName,
                lastName,
                password : await bcrypt.hash( password, 10 ),
                roleId,
                profile : {
                    create : {
                        bio : 'here comes somenthing great of you',
                        englishLevel : 'Your English level',
                        technicalKnowledge : 'Your technical knowledge',
                        urlCV : 'Your ArkusNexus CV Link'
                    }
                }
            }
        } )

        return res.status( 200 ).json( {
            message : 'User updated successfully',
            data : userUpdate
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
        } )
    }
}

export async function deleteUser( req, res ) {
    const { userId } = req.params

    try {
        const userFound = await user.findUnique( {
            where : {
                id : parseInt( userId )
            }
        } )

        if( !userFound ) {
            return res.status( 404 ).json( {
                message : 'User not found!'
            } )
        }

        const userDelete = await user.delete( {
            where : {
                id : parseInt( userId )
            }
        } )

        return res.status( 201 ).json( {
            message : 'User deleted successfully',
            data : userDelete
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}