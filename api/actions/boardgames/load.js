export default function load(req) {
  return Promise.resolve('Promise resolved with ' + req.query.q);
}
