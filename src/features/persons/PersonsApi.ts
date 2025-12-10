import type {
  TPerson,
  TGetPersonsParams,
  CreatePersonDto,
} from "../../types/person.types";
import type { PaginatedResponse } from "../../types/api.types";
import { apiSlice } from "../../api/apiSlice";
import { ApiConfig } from "../../configs/ApiConfig";

export const personsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersons: builder.query<PaginatedResponse<TPerson>, TGetPersonsParams>({
      query: (params) => {
        const { page = 1, full_name, typ, page_size = 20 } = params;
        const searchParams = new URLSearchParams();

        searchParams.append("page", page.toString());
        searchParams.append("page_size", page_size.toString());
        if (full_name) searchParams.append("full_name", full_name);
        if (typ) searchParams.append("typ", typ);

        return {
          url: `${
            ApiConfig.endpoints.persons.getAll
          }?${searchParams.toString()}`,
        };
      },
      providesTags: (result) => {
        if (!result?.results) {
          return [{ type: "person" as const, id: "LIST" }];
        }

        return [
          ...result.results.map((person) => ({
            type: "person" as const,
            id: person.id,
          })),
          { type: "person" as const, id: "LIST" },
        ];
      },
    }),

    deletePerson: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ApiConfig.endpoints.persons.base}/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "person" as const, id },
        { type: "person" as const, id: "LIST" },
      ],
    }),

    createPerson: builder.mutation<TPerson, CreatePersonDto>({
      query: (postData) => ({
        url: ApiConfig.endpoints.persons.base,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: [{ type: "person" as const, id: "LIST" }],
      transformErrorResponse: (response: any) => {
        // تبدیل response به فرمت قابل استفاده
        return {
          status: response.status,
          data: response.data,
          message: response.data?.message || "خطایی رخ داده است",
        };
      },
    }),

    updatePerson: builder.mutation<TPerson, CreatePersonDto & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `${ApiConfig.endpoints.persons.base}${id}/`,
        method: "PATCH",
        body: { ...patch },
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "person" as const, id },
        { type: "person" as const, id: "LIST" },
      ],
      transformErrorResponse: (response: any) => {
        return {
          status: response.status,
          data: response.data,
          message: response.data?.message || "خطایی رخ داده است",
        };
      },
    }),
  }),
});

// Export hooks
export const {
  useGetPersonsQuery,
  useDeletePersonMutation,
  useCreatePersonMutation,
  useUpdatePersonMutation,
} = personsApiSlice;
