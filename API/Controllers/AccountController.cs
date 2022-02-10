using API.Dto;
using API.Entitites;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
            UserDto userDto;

            if (await UserExists(loginDto.Username))
            {
                userDto = new UserDto
                {
                    Username = (await GetUser(loginDto.Username)).Username,
                    id= (await GetUser(loginDto.Username)).id
                    //We will add somemore based on what else is needed by the User
                };
            }
            else { userDto = null; }

            return userDto;
        }
    }
}
