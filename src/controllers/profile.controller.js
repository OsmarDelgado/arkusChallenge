import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { profile } = new PrismaClient

export async function getProfiles( req, res ) {
    try {
        const profiles = await profile.findMany( {
            include : {
                user : true
            }
        } )

        return res.status( 200 ).json( {
            message : 'Profiles',
            data : profiles
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function getProfileById( req, res ) {
    const { profileId } = req.params

    try {
        const profileFound = await profile.findUnique( {
            where : {
                id : parseInt( profileId )
            },

            include : {
                user : true
            }
        } )

        if( !profileFound ) {
            return res.status( 404 ).json( {
                message : "Account does not exist!",
                data : {}
            } )
        }
    
        return res.status( 200 ).json( {
            message : "Account",
            data : profileFound
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function createProfile( req, res ) {
    const { bio, englishLevel, technicalKnowledge, urlCV, userId } = req.body

    try {
        const profileCreate = await profile.create( {
            data : {
                bio,
                englishLevel,
                technicalKnowledge,
                urlCV,
                userId
            }
        } )

        return res.json( {
            message : 'Profile created',
            data : profileCreate
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function updateProfile( req, res ) {
    const { profileId } = req.params
    const { bio, englishLevel, technicalKnowledge, urlCV } = req.body

    try {
        const verifyProfile = await profile.findUnique( {
            where : {
                id : parseInt( profileId )
            },

            include : {
                user : true
            }
        } )

        if( !verifyProfile ) {
            return res.status( 404 ).json( {
                message : "Profile does not exist!",
            } )
        }

        const profileUpdate = await profile.update( {
            where : {
                id : verifyProfile.id
            },

            data : {
                bio,
                englishLevel,
                technicalKnowledge,
                urlCV
            }
        } )

        return res.status( 201 ).json( {
            message : 'Profile Updated',
            data : profileUpdate
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}

export async function deleteProfile( req, res ) {
    const { profileId } = req.params

    try {
        const profileFound = await profile.findUnique( {
            where : {
                id : parseInt( profileId )
            }
        } )

        if( !profileFound ) {
            return res.status( 404 ).json( {
                message : 'Profile not found!'
            } )
        }

        const profileDelete = await profile.delete( {
            where : {
                id : parseInt( profileId )
            }
        } )

        return res.status( 201 ).json( {
            message : 'Profile deleted successfully',
            data : profileDelete
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error",
            data : []
        } )
    }
}
