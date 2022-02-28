const { ACTION_TYPE } = require("./constants");
module.exports = {
  inlineKeyboards: {
    delivery: [
      [
        {
          text: "Доставка",
          callback_data: JSON.stringify({
            type: ACTION_TYPE.COURIER_DELIVERY,
          }),
        },
        {
          text: "Самовывоз",
          callback_data: JSON.stringify({
            type: ACTION_TYPE.PICKUP_DELIVERY,
          }),
        },
      ],
    ],
    bill: [
      [
        {
          text: "Отправить заказ",
          callback_data: JSON.stringify({
            type: ACTION_TYPE.SEND_ORDER_TO_OPERATOR,
          }),
        },
      ],
      [
        {
          text: "Очистить карзину",
          callback_data: JSON.stringify({
            type: ACTION_TYPE.CLEAN_CART,
          }),
        },
      ],
    ],
    location: [
      [
        {
          text: "Показать адрес на карте",
          callback_data: JSON.stringify({
            type: ACTION_TYPE.SHOW_LOCATION_ON_MAP,
          }),
        },
      ],
      [
        {
          text: "Позвонить",
          callback_data: JSON.stringify({
            type: ACTION_TYPE.CLEAN_CART,
          }),
        },
      ],
    ],
  },
};
