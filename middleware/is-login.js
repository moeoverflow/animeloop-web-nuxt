/* eslint-disable consistent-return */
export default function ({
  store, redirect,
}) {
  if (!store.state.auth.authUser) {
    return redirect('/');
  }
}
