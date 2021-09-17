import bcrypt from 'bcryptjs'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { team } = new PrismaClient

export async function getTeam( req, res ) {
    try {
        const teams = await team.findMany( {
            include : {
                user : true,
                account : true
            }
        } )

        return res.status( 200 ).json( {
            message : 'Teams',
            data : teams
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    } 
}

export async function getTeamById( req, res ) {
    const { teamId } = req.params

    try {
        const teamFound = await team.findUnique( {
            where : {
                id : parseInt( teamId )
            },

            include : {
                user : true,
                account : true
            }
        } )

        if( !teamFound ) {
            return res.status( 404 ).json( {
                message : "Team does not exist!",
                data : {}
            } )
        }
    
        return res.status( 200 ).json( {
            message : "Team",
            data : teamFound
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function createTeam( req, res ) {
    const { name, usersId } = req.body

    try {
        const teamCreate = await team.create( {
            data : {
                name,
            },

            include : {
                user : true,
                account : true
            }
        } )

        if( usersId ) {
            usersId.forEach( async (user) => {
                const usersTeam = await team.update( {
                    where : {
                        id : teamCreate.id
                    },

                    data : {
                        users : {
                            connect : { id : user }
                        }
                    }
                } )
            } )
        }

        return res.json( {
            message : 'Team created',
            data : teamCreate
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function updateTeam( req, res ) {
    const { teamId } = req.params
    const { usersId } = req.body

    try {
        const verifyTeam = await team.findUnique( {
            where : {
                id : parseInt( teamId )
            },

            include : {
                user : true,
                account : true
            }
        } )

        if( !verifyTeam ) {
            return res.status( 404 ).json( {
                message : "Team does not exist!",
            } )
        }
        
        if( usersId ) {
            usersId.forEach( async (userAdd) => {
                const connectUsers = await team.update( {
                    where : {
                        id : verifyTeam.id
                    },

                    data : {
                        user : {
                            create : {
                                userId : userAdd
                            }
                        }
                    }
                } )
            } )
        }

        return res.status( 201 ).json( {
            message : 'Team Updated'
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function deleteTeam( req, res ) {
    const { teamId } = req.params
    
    try {
        const teamFound = await team.findUnique( {
            where : {
                id : parseInt( teamId )
            }
        } )

        if( !teamFound ) {
            return res.status( 404 ).json( {
                message : 'Team not found!'
            } )
        }

        const teamDelete = await team.delete( {
            where : {
                id : parseInt( teamId )
            }
        } )

        return res.status( 201 ).json( {
            message : 'Team deleted successfully',
            data : teamDelete
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}