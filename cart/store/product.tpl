<pop:layout name="default"/>
<pop:block region="main"/>

  <pop:include template="cart/_current_items"/>

  <pop:content>
    <pop:title/>
    <p>
      <form action="<pop:cart:add_item_action/>" method="post">
        <button>Add to cart</button>
      </form>
    </p>
  </pop:content>

<pop:block/>