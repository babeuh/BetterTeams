const getId = (prefix, author, name) => {
  return `${prefix}@${author}/${name}`;
};

module.exports = { getId };
