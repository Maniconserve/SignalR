using Microsoft.AspNetCore.SignalR;
namespace Chat_SignalR.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            Clients.All.SendAsync("ReceiveMessage", user, message);

        }
    }
}
