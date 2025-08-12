import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:8000/api/v1";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include", // Sends cookies with every request
  }),
  tagTypes: ["User", "Cart"],

  endpoints: (builder) => ({
    // ===== User Endpoints =====
    getUserProfile: builder.query({
      query: () => "/profile",
      providesTags: ["User"],
    }),

    // ===== Cart Endpoints =====
    getUserCart: builder.query({
      query: (userId) => `/cart/userCart/${userId}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: "Cart", id: arg }] : [{ type: "Cart" }],
    }),

    getCartTotal: builder.query({
      query: (userId) => `/cart/total/${userId}`,
      providesTags: (result, error, arg) =>
        result ? [{ type: "Cart", id: arg }] : [{ type: "Cart" }],
    }),

    incrementCartItem: builder.mutation({
      query: (data) => ({
        url: "/cart/increment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Cart", id: userId },
      ],
    }),

    decrementCartItem: builder.mutation({
      query: (data) => ({
        url: "/cart/decrement",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Cart", id: userId },
      ],
    }),

    removeItem: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/cart/remove/${userId}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "Cart", id: userId },
      ],
    }),

    clearCart: builder.mutation({
      query: (userId) => ({
        url: `/cart/clear/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, userId) => [
        { type: "Cart", id: userId },
      ],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUserCartQuery,
  useGetCartTotalQuery,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} = api;
