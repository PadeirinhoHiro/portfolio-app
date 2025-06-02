export function importIndexAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
    return r;
  });
  return images;
}

export function importAll(r) {
  return r.keys().map(r);
}
