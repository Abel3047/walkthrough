using API.Data;
using API.Entitites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        protected readonly FirebaseDataContext _firebaseDataContext;
        protected static readonly IConfiguration Configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();

        public BaseApiController()
        {
            _firebaseDataContext = new FirebaseDataContext();
        }


        [HttpGet]
        public ActionResult Index()
        {
            return View("Big maragoo");
        }

        
       //Gets all the users in the database
        protected async Task<List<User>> GetAllUsers()=> await _firebaseDataContext.GetData<User>("Account");

        //checks if a user with a certain username exists
        protected async Task<bool> UserExists(string username) => (await GetAllUsers()).Where(u => u.Username == username).Any();

        //gets a specific user by grabbinng the first instance of a match
        protected async Task<User> GetUser(string username) => (await GetAllUsers()).Where(u => u.Username == username).First();

    }
}
