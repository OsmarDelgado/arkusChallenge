import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { account } = new PrismaClient

export async function getAccounts( req, res ) {
    try {
        const accounts = await account.findMany( {
            include : {
                team : true
            }
        } )

        return res.status( 200 ).json( {
            message : 'Accounts',
            data : accounts
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function getAccountById( req, res ) {
    const { accountId } = req.params

    try {
        const accountFound = await account.findUnique( {
            where : {
                id : parseInt( accountId )
            },

            include : {
                team : true
            }
        } )

        if( !accountFound ) {
            return res.status( 404 ).json( {
                message : "Account does not exist!",
                data : {}
            } )
        }
    
        return res.status( 200 ).json( {
            message : "Account",
            data : accountFound
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function createAccount( req, res ) {
    const { name, client, operationChief, teamId } = req.body

    try {
        const accountCreate = await account.create( {
            data : {
                name,
                client,
                operationChief,
                teamId
            }
        } )

        return res.json( {
            message : 'Account created',
            data : accountCreate
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function updateAccound( req, res ) {
    const { accountId } = req.params
    const { name, client, operationChief, teamId } = req.body

    try {
        const verifyAccount = await account.findUnique( {
            where : {
                id : parseInt( accountId )
            },

            include : {
                team : true
            }
        } )

        if( !verifyAccount ) {
            return res.status( 404 ).json( {
                message : "Account does not exist!",
            } )
        }

        const accountUpdate = await account.update( {
            where : {
                id : verifyAccount.id
            },

            data : {
                name,
                client,
                operationChief,
                teamId
            }
        } )

        return res.status( 201 ).json( {
            message : 'Account Updated',
            data : accountUpdate
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function deleteAccount( req, res ) {
    const { accountId } = req.params
    
    try {
        const accountFount = await account.findUnique( {
            where : {
                id : parseInt( accountId )
            }
        } )

        if( !accountFount ) {
            return res.status( 404 ).json( {
                message : 'Team not found!'
            } )
        }

        const accountDelete = await account.delete( {
            where : {
                id : parseInt( accountId )
            }
        } )

        return res.status( 201 ).json( {
            message : 'Account deleted successfully',
            data : accountDelete
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}
