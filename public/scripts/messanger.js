const renderMessages = function (e) {
  e.preventDefault();
  console.log("Clicked!");

  $.get(`/products/user/${req.session.userId}/${products.owner_id}`)
    .then(message => {
      console.log('message: ', message);
      bringMessages(message);
    })
    .catch(err => err);
};

const bringMessages = function (conversation) {
  const $container = $("#message-box");
  for(let mess in conversation) {
    $container.append(`
    <main class="container">
    <div class="message-body">
      <section class="new-message">
        <form method="POST" id="message-form">
          <div class="message-type">
            <textarea name="message" id="message-text" placeholder="Type a message here"></textarea>
            <button type="submit">Send</button>
          </div>
          <hr>
        </form>
      </section>
      <div class="image-conversation">
        <div class="product-image"><img src="${products.img_url}" /></div>
        <section class="messages" id="messages-container">

            <li class="sender">
              ${conversation[mess].message}
            </li>
            <p>Sent by ${conversation[mess].name} @ ${new Date(Date.now())} </p>
        </section>
      </div>
      <hr>
    </div>
  </main>
    `);
  }
}

module.exports = {renderMessages};
