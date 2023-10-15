CREATE OR REPLACE FUNCTION get_order_history(order_id TEXT) RETURNS TABLE (
                                                                              old_status_name TEXT,
                                                                              new_status_name TEXT,
                                                                              change_date timestamp
                                                                          ) AS $$
BEGIN
    RETURN QUERY
        SELECT os1.name AS old_status, os2.name AS new_status, oh."createdAt" AS change_date
        FROM "OrderHistory" oh
                 JOIN "OrderStatus" os1 ON oh."oldStatusId" = os1.id
                 JOIN "OrderStatus" os2 ON oh."newStatusId" = os2.id
        WHERE oh."orderId" = order_id;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM get_order_history('453e72d2-e636-4a4c-b96b-7406728b7aec');
