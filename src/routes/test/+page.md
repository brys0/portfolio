<script lang="ts">
    import Codeblock from '$lib/components/Markdown.svelte';
</script>

<blog:codeblock language="kotlin" filename="Main.kt">
package com.shuttle.backend

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.shuttle.backend.base.Configuration
import com.shuttle.backend.base.database.DatabaseManager
import com.shuttle.backend.base.database.schema.AuditLogDTO
import com.shuttle.backend.base.database.schema.AuditLogType
import com.shuttle.backend.base.database.schema.JobStartAudit
import com.shuttle.backend.base.job.JobManager
import com.shuttle.backend.base.job.JobType
import com.shuttle.backend.base.repository.AlbumRepository
import com.shuttle.backend.base.repository.AuditLogRepository
import com.shuttle.backend.base.repository.FileRepository
import com.shuttle.backend.base.repository.UserRepository
import com.shuttle.backend.base.storage.StorageManager
import com.shuttle.backend.server.ShuttleAPI
import io.klogging.Level
import io.klogging.config.ANSI_CONSOLE
import io.klogging.config.loggingConfiguration
import io.klogging.logger
import org.koin.core.context.GlobalContext.startKoin
import org.koin.dsl.module

val BASE_LOG = "Shuttle -> "
suspend fun main() {
    loggingConfiguration {
        minDirectLogLevel(Level.DEBUG)
        ANSI_CONSOLE()
    }
    val logger = logger("Main")
    val config = Configuration.fromConfigurationFile()
    val database = DatabaseManager()

    logger.info("Config dir: ${config.fileDirectory.absolutePath}")
    logger.info("Starting Koin")


    startKoin {
        modules(module {
            single { config }
            single { database.database }
            single { JobManager().startThread() }
            single { AuditLogRepository() }


            single { UserRepository() }
            single { AlbumRepository() }
            single { StorageManager(config.toConfiguration()) }
            single { FileRepository() }
        })
    }



    ShuttleAPI().start()
}
</blog:codeblock>


Other code
<blog:codeblock language="svelte" filename="Main.svelte">
<script lang="ts">
    let { src, alt }: any = $props()
</script>

<a href={src} class="w-full" target="_blank">
    <img {src} {alt} class="h-auto w-[80%] rounded-lg border-2" />
</a>
</blog:codeblock>
