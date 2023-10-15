CREATE TRIGGER trg_check_discount_date
    BEFORE INSERT OR UPDATE ON "Discount"
    FOR EACH ROW
EXECUTE FUNCTION check_discount_date();

-- Try to add a new discount where startDate is after endDate & see what happens