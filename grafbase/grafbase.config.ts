import { g, auth, config } from '@grafbase/sdk'

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

// @ts-ignore
const User = g.model('User', {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  // @ts-ignore
  projects: g.relation(() => Project).list().optional(),
}).auth((rules) => {
  rules.public().read();
})

// @ts-ignore
const Project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string().optional(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  // @ts-ignore
  createdBy: g.relation(() => User)
}).auth((rules => {
  rules.public().read(),
  rules.private().create().delete().update();
}))

const jwt = auth.JWT({
  issuer: 'grafbase',
  // every jwt has to have a secret
  secret: g.env('NEXTAUTH_SECRET'),

})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private() //allow access to any signin user
  }
})
