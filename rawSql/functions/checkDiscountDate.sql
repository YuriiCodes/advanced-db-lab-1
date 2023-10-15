CREATE OR REPLACE FUNCTION check_discount_date()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW."startDate" >= NEW."endDate" THEN
        RAISE EXCEPTION 'Start date must be before the end date!';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
