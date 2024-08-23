using System;
using System.Security.Cryptography;

namespace Almondcove.Library
{
    public class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            byte[] salt = GenerateSalt();
            byte[] hash = ComputeHash(password, salt);

            // Combine salt and hash for storage
            byte[] combinedBytes = new byte[salt.Length + hash.Length];
            Array.Copy(salt, 0, combinedBytes, 0, salt.Length);
            Array.Copy(hash, 0, combinedBytes, salt.Length, hash.Length);

            return Convert.ToBase64String(combinedBytes);
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            byte[] combinedBytes = Convert.FromBase64String(hashedPassword);
            byte[] salt = new byte[16];
            byte[] hash = new byte[32];

            // Extract salt and hash from combined bytes
            Array.Copy(combinedBytes, 0, salt, 0, salt.Length);
            Array.Copy(combinedBytes, salt.Length, hash, 0, hash.Length);

            byte[] computedHash = ComputeHash(password, salt);

            // Compare the computed hash with the stored hash
            return ByteArraysEqual(hash, computedHash);
        }

        private static byte[] GenerateSalt()
        {
            byte[] salt = new byte[16];
            using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        private static byte[] ComputeHash(string password, byte[] salt)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] passwordBytes = System.Text.Encoding.UTF8.GetBytes(password);
                byte[] combinedBytes = new byte[passwordBytes.Length + salt.Length];

                Array.Copy(passwordBytes, 0, combinedBytes, 0, passwordBytes.Length);
                Array.Copy(salt, 0, combinedBytes, passwordBytes.Length, salt.Length);

                return sha256.ComputeHash(combinedBytes);
            }
        }

        private static bool ByteArraysEqual(byte[] a, byte[] b)
        {
            if (a.Length != b.Length)
            {
                return false;
            }

            for (int i = 0; i < a.Length; i++)
            {
                if (a[i] != b[i])
                {
                    return false;
                }
            }

            return true;
        }
    }
}
