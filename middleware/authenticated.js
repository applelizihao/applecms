export default function ({ store, redirect, req, route }) {
  if (process.browser) {
    if (!document.cookie) {
      redirect('/user/login')
    }
  } else if (!req.headers.cookie) {
    redirect('/user/login')
  }
}
