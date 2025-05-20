function importAll(r) {
  return r.keys().map(r);
}

export const Pj1 = importAll(
  require.context("../images/p1/", false, /\.(png|jpe?g|svg)$/),
);

export const Pj2 = importAll(
  require.context("../images/p2/", false, /\.(png|jpe?g|svg)$/),
);
