CREATE OR REPLACE FUNCTION total_spent_by_user(user_id TEXT) RETURNS FLOAT AS $$
DECLARE
    total FLOAT;
BEGIN
    SELECT SUM(payment.amount) INTO total
    FROM "Payment" as payment
             JOIN "Order" as o ON payment."orderId" = o.id
    WHERE o."userId" = user_id;

    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- SELECT total_spent_by_user('d0bf87bb-86f2-4925-8bf7-21340f40d382');
