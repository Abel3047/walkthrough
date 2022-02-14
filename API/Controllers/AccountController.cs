using API.Dto;
using API.Entitites;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        public AccountController()
        {

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //checks if user exists by comparing what the loginDto has with whats in the database using username as a parameter
            if (!await UserExists(loginDto.Username))
                return BadRequest("User Doesn't Exist");

            //This made so we can get a user to access the varible passwordHash to compare to
            User user = await GetUser(loginDto.Username);
            //This creates a unique hmac class that we use to compare and verify . It will generate the same hash with the same key and the same input
            //Below we are taking the key from the user entity the user claim to be
            var hmac = new HMACSHA512((await GetUser(loginDto.Username)).PasswordSalt);
            //creates the hash with the key from the entity and uses
            byte[] password = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            
            for (int i = 0; i < password.Length; i++)
            {
                //Compares the individual values 
                //Consider using an aggregate method
                if (user.PasswordHash[i] != password[i]) return BadRequest("Password is incorrect");
            }
            return new UserDto
            {
                Username = user.Username
                //We would add email 
            };
        }
        //the signup is call a uri, Universal Resource Identifier. The url is the locator for our Api which is https://localhost:5001/
        [HttpPost("signup")]
        public async Task<ActionResult<UserDto>> SignUp(CreateAccountDto createDto)
        {
            if (await UserExists(createDto.Username)) BadRequest("Taken dawg, try another name");
            //There seems to be a delay here. I don't like what we have here
            int id = (await GetAllUsers()).Count; // We using count cause its already one above the id of the last nigga

            var hmac = new HMACSHA512();

            User user = new User
            {
                Username = createDto.Username,
                Id = id,
                PasswordSalt = hmac.Key,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(createDto.Password))
            };

            _firebaseDataContext.StoreData($"Account/{user.Id}", user);

            return new UserDto
            {
                Username = user.Username
                //We would add email 
            };
        }
    }
}
