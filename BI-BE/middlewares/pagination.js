const pagination = async (Model, page) => {
    let { count, rows } = await Model.findAndCountAll({
        limit: 10,
        offset: Number(page) * 10,
        order: [
          ['id', 'DESC'],
      ],
      });

      return {count, rows}
}

module.exports = pagination