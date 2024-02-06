import * as Yup from "yup";

export const CouponSchema = Yup.object().shape({
    couponCode: Yup.string().required("Coupon code is required"),
    discountPercentage: Yup.number()
        .typeError("Discount percentage must be a number")
        .required("Discount percentage is required")
        .min(0, "Discount percentage must be greater than or equal to 0")
        .max(100, "Discount percentage must be less than or equal to 100"),
    maxLimit: Yup.number()
        .typeError("Max limit must be a number")
        .required("Max limit is required")
        .min(0, "Max limit must be greater than or equal to 0"),
    expiryDate: Yup.date()
        .typeError("Expiry date must be a valid date")
        .required("Expiry date is required")
        .min(new Date(), "Expiry date must be today or a future date"),
});