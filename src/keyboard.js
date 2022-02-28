const kb = require('./keyboard-buttons');

module.exports = {
  home: [[kb.home.getData], [kb.unsubscribe]],
  // home: [[kb.home.getList], [kb.home.addItem]],
  // menu: [[kb.menu.kebab, kb.menu.garnish], [kb.menu.souses, kb.menu.drinks], [kb.back]],
  // locations: [[{ text: "Отправить местоположение", request_location: true }], [kb.back]],
  subscribe: [[kb.subscribe]],
  onlyBack: [[kb.back]],
};
