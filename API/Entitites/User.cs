using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entitites
{
    public class User
    {
        public string Username { get; set; }
        public int Id { get; set; }// To differentiate between objects in the database


        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }
}