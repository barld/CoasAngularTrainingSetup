﻿using Microsoft.EntityFrameworkCore;

namespace TripApi.DbModels;

public class TripContext : DbContext
{
    public TripContext(DbContextOptions<TripContext> options)
        : base(options)
    {
    }

    public DbSet<Trip> Trips { get; set; } = null!;
}
