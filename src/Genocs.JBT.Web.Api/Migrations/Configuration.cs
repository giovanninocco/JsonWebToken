namespace Genocs.JBT.Web.Api.Migrations
{
    using Genocs.JBT.Web.Api.Infrastructure;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Genocs.JBT.Web.Api.Infrastructure.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Genocs.JBT.Web.Api.Infrastructure.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
 

            var user = new ApplicationUser()
            {
                UserName = "Administrator",
                Email = "giovanni.nocco@gmail.com",
                EmailConfirmed = true,
                FirstName = "Giovanni",
                LastName = "Nocco",
                Level = 1,
                JoinDate = DateTime.Now.AddYears(-1)
            };

            manager.Create(user, "MySuperP@ssword!");

            if (roleManager.Roles.Count() == 0)
            {
                roleManager.Create(new IdentityRole { Name = "SuperAdmin" });
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "Maintenance" });
                roleManager.Create(new IdentityRole { Name = "PowerUser" });
                roleManager.Create(new IdentityRole { Name = "User" });
                roleManager.Create(new IdentityRole { Name = "Guest" });
            }

            var adminUser = manager.FindByName("Administrator");

            manager.AddToRoles(adminUser.Id, new string[] { "SuperAdmin", "Admin" });

        }
    }
}
