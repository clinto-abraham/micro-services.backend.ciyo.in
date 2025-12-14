const { Op } = require("sequelize");
const { User } = require("../models");

/**
 * Cleanup job
 * - Deletes soft-deleted users older than 30 days
 * - Clears unused 2FA secrets
 */
async function runCleanup() {
  try {
    console.log("🧹 Cleanup job started");

    // 1️⃣ Permanently delete soft-deleted users (older than 30 days)
    const deletedUsers = await User.destroy({
      where: {
        deletedAt: {
          [Op.lt]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      },
      force: true
    });

    // 2️⃣ Clear stale 2FA secrets (users never activated 2FA)
    const cleared2FA = await User.update(
      { twoFactorSecret: null },
      {
        where: {
          twoFactorEnabled: false,
          twoFactorSecret: { [Op.ne]: null }
        }
      }
    );

    console.log(`🧹 Deleted users: ${deletedUsers}`);
    console.log(`🧹 Cleared 2FA secrets: ${cleared2FA[0]}`);

    console.log("✅ Cleanup job completed");
  } catch (error) {
    console.error("❌ Cleanup job failed:", error);
  }
}

module.exports = runCleanup;
