<pop:layout name="cart"/>
<pop:block region="main">

  <pop:entries from="cart">
    <h1><pop:title/></h1>
    <p>
      <form action="<pop:cart:add_item_action/>" method="post">
        <button>Add to cart</button>
      </form>
    </p>
  </pop:entries>

  <h2>In your cart:</h2>
  <pop:cart:items wrap="ul" break="li">
    <h2><pop:title/> (<pop:quantity/>)</h2>
    <pop:body/>
  </pop:cart:items>

  <h3><a href="<pop:cart:checkout_link/>">Checkout Now</a></h3>
</pop:block>
