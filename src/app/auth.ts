import NextAuth, { DefaultSession } from "next-auth"
import Discord from "next-auth/providers/discord"

declare module "next-auth" {
	interface User {
		id: string
	}
	interface Session {
		user: {
			id: string
		} & DefaultSession["user"]
	}
}

declare module "next-auth/providers/discord" {
	interface DiscordProfile {
		id: string
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Discord( {
			authorization: {
				params: { scope: "identify email" }
			},
			async profile( profile ) {
				if ( profile.avatar === null ) {
					const defaultAvatarNumber =
						profile.discriminator === "0"
							? Number(BigInt(profile.id) >> BigInt(22)) % 6
							: parseInt(profile.discriminator) % 5
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png?foo=1`
				} else {
					const format = profile.avatar.startsWith( "a_" ) ? "gif" : "png"
					profile.image_url = `https://cdn.discordapp.com/avatars/${ profile.id }/${ profile.avatar }.${ format }`
				}

				return { ...profile };
			}
		} ),
	],
	callbacks: {
		async session( { session, token } ) {
			if ( token ) {
				session.user.id = token.id as string;
			}

			return session;
		},
		async jwt( { token, user, profile } ) {
			if ( user ) {
				token.id = profile.id;
			}

			return token
		}
	}
})