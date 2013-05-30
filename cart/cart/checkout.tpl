<pop:layout name="cart"/>
<pop:block region="main">
  <pop:content>
    <pop:confirmed>
      <!-- Message to show when an order was confirmed -->
      <h1>Order Confirmed</h1>
      <h2>Thank you for your business!</h2>
    </pop:confirmed>

    <pop:not_confirmed>
      <!-- Confirmation screen -->

      <h3>Items in cart:</h3>
      <table>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
        <pop:cart:items break="tr">
          <td><pop:title/></td>
          <td><pop:quantity/></td>
        </pop:cart:items>

      </table>

      <h2>Confirm your order</h2>
      <form action="<pop:cart:checkout_action/>" method="post">
        <p>
          <label>Name: <input name="name" required/></label>
        </p>
        <p>
          <label>Email: <input name="email" type="email" required/></label>
        </p>
        <p>
          <label>Address: <textarea name="address"></textarea></label>
        </p>
        <p>
          <button>Confirm order</button>
        </p>
      </form>
    </pop:not_confirmed>
  </pop:content>
</pop:block>
