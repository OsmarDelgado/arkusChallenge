import jwt from 'jsonwebtoken'
import config from '../auth/auth.config.js'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { user, role } = new PrismaClient

export async function verifyToken( req, res, next ) {
    const token = req.headers[ 'x-access-token' ]

    if( !token ) {
        return res.status( 403 ).json( {
            message : 'Not token provided!',
            token : ''
        } )
    }

    try {
        const decodedJwt = jwt.verify( token, config.SECRET )

        const userFound = await user.findUnique( {
            where : {
                email : decodedJwt.email
            },
    
            select : {
                email : true
            }
        } )
    
        if( !userFound ) {
            return res.status( 404 ).json( {
                message : 'User does not exist!',
                data : {}
            } )
        }

        next()

    } catch (error) {
        console.log( error )

        return res.status(401).json( {
            message : "Unathorized"
        } );
    }
}

export async function isAdmin( req, res, next ) {
    const token = req.headers[ 'x-access-token' ]

    try {
        const decodedJwt = jwt.verify( token, config.SECRET )

        const userFound = await user.findUnique( {
            where : {
                email : decodedJwt.email
            },

            select : {
                roleId : true
            }
        } )

        const roleExist = await role.findUnique( {
            where : {
                id : userFound.roleId
            },

            select : {
                name : true
            }
        } )

        // console.log( roleExist.name )

        if( roleExist.name === "Superadmin" || roleExist.name === "Admin" ) return next()

        return res.status( 403 ).json( {
            message : "You don't have permissions!"
        } )

    } catch (error) {
        console.log( error )

        return res.status(500).json( {
            message : "Internal Server Error"
        } );
    }
}

export async function isUser( req, res, next ) {
    const token = req.headers[ 'x-access-token' ]

    try {
        const decodedJwt = jwt.verify( token, config.SECRET )

        const userFound = await user.findUnique( {
            where : {
                email : decodedJwt.email
            },

            select : {
                roleId : true
            }
        } )

        const roleExist = await role.findUnique( {
            where : {
                id : userFound.roleId
            },

            select : {
                name : true
            }
        } )

        // console.log( roleExist.name )

        if( roleExist.name === "User" ) return next()

        return res.status( 403 ).json( {
            message : "You don't have permissions!"
        } )

    } catch (error) {
        console.log( error )

        return res.status(500).json( {
            message : "Internal Server Error"
        } );
    }
}