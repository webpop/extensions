<pop:layout name="cart"/>
<pop:block region="main">

  <pop:include template="cart/_current_items"/>

  <pop:entries from="store">
    <a href="<pop:permalink/>">
      <h2><pop:title/></h2>
    </a>
    <p>
      <form action="<pop:cart:add_item_action/>" method="post">
        <button>Add to cart</button>
      </form>
    </p>
  </pop:entries>

  <a href="<pop:cart:checkout_link/>">
    <button><h1>Checkout Now</h1></button>
  </a>

</pop:block>