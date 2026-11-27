const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgxODA1ZTc2ZmQ1ZmEyZmQ5MWMyYmIzOWU0YjdlZjA1NDY5YmRkY2UiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU3lzdGVtIEFkbWluIEt1biIsInJvbGUiOiJzdHVkZW50IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2xvY2FsaWItY2IxMDkiLCJhdWQiOiJsb2NhbGliLWNiMTA5IiwiYXV0aF90aW1lIjoxNzk1MzM1NjkzLCJ1c2VyX2lkIjoidnpxZFFzNGx6R1RJOThkSnp5S1oyTXAyNGNwMiIsInN1YiI6InZ6cWRRczRsekdUSTk4ZEp6eUtaMk1wMjRjcDIiLCJpYXQiOjE3OTUzMzU2OTMsImV4cCI6MTc5NTMzOTI5MywiZW1haWwiOiI1MTUxNTE1MUBsb2NhbGliLm9uZyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIjUxNTE1MTUxQGxvY2FsaWIub25nIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.LvjXSXs3U3F69Xb7cIqlzoZHQq35fKZedItgRxRfqtv6zmd4mjF8KHxvSRglhkJ1Araeq2s5hddAL15nvlnr6pIlO5FpCN3RGxq8baXpRV5ATc84X0AQrql0BITX20eKywGs5ac2595N7LeND-HRbXo945tMxnd4Y7obqlAsC8r5Bc3SQRztD_2Sjbu7q2verRKtlzbG90Nmv-nAYSXbSYOyUVAa-wxZBz_RrGwfgAORVDuLr8dQsq9PnqM1C8Xahoq7fFvZbuHwQncEyADNC9wY6eGfU7cmTApf7pgIpiLaquEHkrF455N5ApcF1zq8DIC6ZIzPAS6VEuxumMSf6A"
const bookId = "8W97qanIUozZziNcBUJ3"
const url = "http://192.168.0.193:8000"

export async function getBook() {
    console.log(1)
    const response = await fetch(`${url}/app/books/${bookId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })  

    const data = response.json() ?? null
    


    console.log(await data)
}