using Microsoft.EntityFrameworkCore;
using TripApi.DbModels;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<TripContext>(opt => 
    opt.UseInMemoryDatabase("Trips"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    var context = service.GetService<TripContext>();

    context.Trips.AddRange(
        new Trip
        {
            Id = 1,
            Description = "description 1",
            Distance = 10,
            From = "Coas",
            To = "MC"
        },
        new Trip
        {
            Id = 2,
            Description = "description 1",
            Distance = 12.89312,
            From = "Coas",
            To = "thuis"
        },
        new Trip
        {
            Id = 3,
            Description = "description 1",
            Distance = 15.5,
            From = "Coas",
            To = "umob"
        });

    context.SaveChanges();
}

app.Run();

