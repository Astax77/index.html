<?php
$total = isset($_GET['total']) ? $_GET['total'] : 0;
?>

<div>Total price: $<?php echo number_format($total, 2); ?></div>

<form method="post" action="process_payment.php">
    <input type="hidden" name="total" value="<?php echo $total; ?>">
    <button type="submit">Pay Now</button>
</form>
